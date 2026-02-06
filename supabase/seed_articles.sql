-- Seed Data: Articles for Insights Page
-- Run this in your Supabase SQL Editor after applying schema.sql

-- Article 1: Nurturing the Musical Ear
INSERT INTO articles (id, title, tag, read_time, hero_image, author_name, author_role, author_avatar, mascot_insight)
VALUES (
  'a1111111-1111-1111-1111-111111111111',
  'Nurturing the musical ear',
  'Music',
  '5 min read',
  'https://images.unsplash.com/photo-1596253434315-99c922a96996?q=80&w=800&auto=format&fit=crop',
  'Dr. Sarah Chen',
  'Geneticist',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop',
  'Children with musical potential often show early signs of rhythmic awareness. Watch for foot-tapping or humming along to songs—these are golden opportunities!'
);

INSERT INTO article_sections (article_id, section_type, content, list_items, "order")
VALUES
  ('a1111111-1111-1111-1111-111111111111', 'paragraph', 'Research shows that musical ability has both genetic and environmental components. While your child may have inherited genes associated with pitch perception and rhythmic timing, nurturing these talents is key to their development.', NULL, 1),
  ('a1111111-1111-1111-1111-111111111111', 'heading', 'Why Early Exposure Matters', NULL, 2),
  ('a1111111-1111-1111-1111-111111111111', 'paragraph', 'The brain is most plastic during early childhood. Introducing music through play, singing, and simple instruments can create neural pathways that last a lifetime.', NULL, 3),
  ('a1111111-1111-1111-1111-111111111111', 'heading', 'Signs of Musical Potential', NULL, 4),
  ('a1111111-1111-1111-1111-111111111111', 'list', NULL, ARRAY['Responds strongly to rhythm and melody', 'Can remember and reproduce tunes accurately', 'Shows interest in different instruments', 'Enjoys singing or humming frequently'], 5),
  ('a1111111-1111-1111-1111-111111111111', 'heading', 'What You Can Do', NULL, 6),
  ('a1111111-1111-1111-1111-111111111111', 'paragraph', 'Expose your child to diverse genres of music. Encourage them to explore instruments without pressure. Most importantly, make music a joyful part of your daily routine.', NULL, 7);

INSERT INTO article_activities (article_id, activity_text, checked_default)
VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Play background music during meals', FALSE),
  ('a1111111-1111-1111-1111-111111111111', 'Sing together during car rides', FALSE),
  ('a1111111-1111-1111-1111-111111111111', 'Try a simple percussion instrument', FALSE);

-- Article 2: Building Athletic Potential
INSERT INTO articles (id, title, tag, read_time, hero_image, author_name, author_role, author_avatar, mascot_insight)
VALUES (
  'a2222222-2222-2222-2222-222222222222',
  'Building athletic potential with ACTN3',
  'Sports',
  '7 min read',
  'https://images.unsplash.com/photo-1552674605-5d226a5be999?q=80&w=800&auto=format&fit=crop',
  'Coach Mike Johnson',
  'Sports Scientist',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  'The ACTN3 gene is often called the "speed gene." But remember, genes set the stage—consistent practice and nutrition write the script!'
);

INSERT INTO article_sections (article_id, section_type, content, list_items, "order")
VALUES
  ('a2222222-2222-2222-2222-222222222222', 'paragraph', 'Your child''s genetic profile suggests natural aptitude for power-based sports. The ACTN3 gene affects the type of muscle fibers produced, with certain variants favoring explosive strength and speed.', NULL, 1),
  ('a2222222-2222-2222-2222-222222222222', 'heading', 'Understanding ACTN3', NULL, 2),
  ('a2222222-2222-2222-2222-222222222222', 'paragraph', 'The CC variant is associated with fast-twitch muscle fibers, which are excellent for sprinting, jumping, and quick movements. Many elite sprinters and power athletes carry this variant.', NULL, 3),
  ('a2222222-2222-2222-2222-222222222222', 'heading', 'Recommended Activities', NULL, 4),
  ('a2222222-2222-2222-2222-222222222222', 'list', NULL, ARRAY['Short-distance running and sprinting games', 'Jumping activities like basketball or volleyball', 'Swimming for overall fitness', 'Martial arts for discipline and agility'], 5),
  ('a2222222-2222-2222-2222-222222222222', 'paragraph', 'Remember that enjoyment is the best predictor of long-term athletic engagement. Let your child explore different sports and find what they love.', NULL, 6);

INSERT INTO article_activities (article_id, activity_text, checked_default)
VALUES
  ('a2222222-2222-2222-2222-222222222222', 'Schedule a trial class for a new sport', FALSE),
  ('a2222222-2222-2222-2222-222222222222', 'Practice sprinting games in the park', FALSE),
  ('a2222222-2222-2222-2222-222222222222', 'Ensure adequate protein in diet', FALSE);

-- Article 3: Omega-3 and Brain Development
INSERT INTO articles (id, title, tag, read_time, hero_image, author_name, author_role, author_avatar, mascot_insight)
VALUES (
  'a3333333-3333-3333-3333-333333333333',
  'Omega-3 and cognitive development',
  'Nutrition',
  '6 min read',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
  'Dr. Lisa Wang',
  'Nutritionist',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=150&auto=format&fit=crop',
  'DHA, a type of Omega-3, makes up 40% of the fatty acids in your brain. Feed the mind with the right fats!'
);

INSERT INTO article_sections (article_id, section_type, content, list_items, "order")
VALUES
  ('a3333333-3333-3333-3333-333333333333', 'paragraph', 'Your child''s genetic report indicates increased need for Omega-3 fatty acids. These essential fats are crucial for brain development, memory, and cognitive function.', NULL, 1),
  ('a3333333-3333-3333-3333-333333333333', 'heading', 'Why Omega-3 Matters', NULL, 2),
  ('a3333333-3333-3333-3333-333333333333', 'paragraph', 'The brain is 60% fat, and Omega-3s are among the most important building blocks. They support neuron structure, reduce inflammation, and enhance signal transmission between brain cells.', NULL, 3),
  ('a3333333-3333-3333-3333-333333333333', 'heading', 'Best Food Sources', NULL, 4),
  ('a3333333-3333-3333-3333-333333333333', 'list', NULL, ARRAY['Fatty fish: salmon, mackerel, sardines', 'Walnuts and chia seeds', 'Fortified eggs', 'Algae-based supplements for vegetarians'], 5),
  ('a3333333-3333-3333-3333-333333333333', 'paragraph', 'Aim for 2-3 servings of fatty fish per week. If your child doesn''t like fish, consider a high-quality fish oil supplement after consulting your pediatrician.', NULL, 6);

INSERT INTO article_activities (article_id, activity_text, checked_default)
VALUES
  ('a3333333-3333-3333-3333-333333333333', 'Add salmon to this week''s meal plan', FALSE),
  ('a3333333-3333-3333-3333-333333333333', 'Try a chia seed smoothie recipe', FALSE),
  ('a3333333-3333-3333-3333-333333333333', 'Research Omega-3 supplements for kids', FALSE);
