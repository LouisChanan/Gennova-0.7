-- Gennova DNA - Biological Refactor Schema

-- 1. Core Users (Account Holders)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  dob DATE,
  sex_at_birth TEXT CHECK (sex_at_birth IN ('Male', 'Female')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. DNA Subjects (Profiles - can be children or self)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  dob DATE,
  gender TEXT,
  height FLOAT,
  weight FLOAT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. DNA Test Kits
CREATE TABLE IF NOT EXISTS dna_test_kits (
  kit_id TEXT PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  report_type TEXT CHECK (report_type IN ('DIET_NUTRITION', 'TALENT', 'BOTH')),
  status TEXT DEFAULT 'activated' CHECK (status IN ('activated', 'laboratory', 'processing', 'completed')),
  sample_id TEXT, -- Tube barcode
  lab_report_date TIMESTAMP WITH TIME ZONE,
  activated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Knowledge Base: Traits
CREATE TABLE IF NOT EXISTS traits (
  trait_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL, -- e.g., 'Nutrient Needs', 'Talent'
  name TEXT NOT NULL,
  description_th TEXT,
  description_en TEXT,
  icon_name TEXT -- Added for UI mapping
);

-- 5. Knowledge Base: Genotype Rules
CREATE TABLE IF NOT EXISTS genotype_rules (
  rule_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trait_id UUID REFERENCES traits(trait_id) ON DELETE CASCADE,
  rs_id TEXT NOT NULL, -- SNP ID
  target_genotype TEXT NOT NULL, -- e.g., 'TT'
  result_level TEXT NOT NULL, -- e.g., 'Gifted', 'Weak'
  score_value INTEGER CHECK (score_value BETWEEN 1 AND 100)
);

-- 6. Raw Lab Data: User Genotypes
CREATE TABLE IF NOT EXISTS user_genotypes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  gene_symbol TEXT,
  rs_id TEXT NOT NULL,
  genotype TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Interpreted Data: User Phenotypes
CREATE TABLE IF NOT EXISTS user_phenotypes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  trait_id UUID REFERENCES traits(trait_id) ON DELETE CASCADE NOT NULL,
  result_level TEXT,
  score_value INTEGER,
  display_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Content: Recommendations
CREATE TABLE IF NOT EXISTS recommendations (
  rec_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trait_id UUID REFERENCES traits(trait_id) ON DELETE CASCADE,
  result_condition TEXT, -- e.g., 'Gifted', 'Increased Need'
  advice_text TEXT NOT NULL,
  type TEXT CHECK (type IN ('SUPPLEMENT', 'LIFESTYLE', 'EXERCISE'))
);

-- 9. Content: Nutrition
CREATE TABLE IF NOT EXISTS food_database (
  food_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  calories INTEGER,
  protein FLOAT,
  carbs FLOAT,
  fat FLOAT,
  tags TEXT[] -- e.g., ['Dairy-Free', 'High-Omega3']
);

CREATE TABLE IF NOT EXISTS meal_plans (
  plan_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  meal_name TEXT NOT NULL,
  recipe_instructions TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Content: Celebrity Matches
CREATE TABLE IF NOT EXISTS celebrity_matches (
  celeb_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  matching_trait_id UUID REFERENCES traits(trait_id) ON DELETE CASCADE,
  description TEXT,
  image_url TEXT
);

-- 11. Content: Articles & Insights
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  tag TEXT NOT NULL, -- e.g., 'Music', 'Sports', 'Nutrition'
  read_time TEXT, -- e.g., '5 min read'
  hero_image TEXT,
  author_name TEXT,
  author_role TEXT,
  author_avatar TEXT,
  mascot_insight TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS article_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
  section_type TEXT CHECK (section_type IN ('paragraph', 'heading', 'list')),
  content TEXT,
  list_items TEXT[], -- For 'list' type
  "order" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS article_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
  activity_text TEXT NOT NULL,
  checked_default BOOLEAN DEFAULT FALSE
);

-- RLS POLICIES --


ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dna_test_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE traits ENABLE ROW LEVEL SECURITY;
ALTER TABLE genotype_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_genotypes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_phenotypes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE celebrity_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_activities ENABLE ROW LEVEL SECURITY;

-- Visibility Policies (Profile-based isolation)
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view their subjects" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view kits" ON dna_test_kits FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = dna_test_kits.profile_id AND profiles.user_id = auth.uid()));
CREATE POLICY "Users can view genotypes" ON user_genotypes FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = user_genotypes.profile_id AND profiles.user_id = auth.uid()));
CREATE POLICY "Users can view phenotypes" ON user_phenotypes FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = user_phenotypes.profile_id AND profiles.user_id = auth.uid()));
CREATE POLICY "Users can view meal plans" ON meal_plans FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = meal_plans.profile_id AND profiles.user_id = auth.uid()));

-- Global Content (ReadOnly for all authenticated)
CREATE POLICY "Public read for traits" ON traits FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public read for rules" ON genotype_rules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public read for recommendations" ON recommendations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public read for food" ON food_database FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public read for celebs" ON celebrity_matches FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public read for articles" ON articles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public read for article sections" ON article_sections FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public read for article activities" ON article_activities FOR SELECT TO authenticated USING (true);

