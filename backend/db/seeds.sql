-- Hweibo PostgreSQL seed data (safe to re-run)

INSERT INTO "user" (email, password_hash, role, is_active)
VALUES
  ('buyer@hweibo.local', 'demo', 'buyer', TRUE),
  ('seller@hweibo.local', 'demo', 'seller', TRUE),
  ('admin@hweibo.local', 'demo', 'admin', TRUE)
ON CONFLICT (email) DO NOTHING;

INSERT INTO buyerprofile (user_id, display_name, phone, shipping_address)
SELECT id, 'Buyer Demo', '+255700000001', 'Nyerere Square, Dodoma'
FROM "user"
WHERE email = 'buyer@hweibo.local'
ON CONFLICT (user_id) DO UPDATE
SET display_name = EXCLUDED.display_name,
    phone = EXCLUDED.phone,
    shipping_address = EXCLUDED.shipping_address;

INSERT INTO sellerprofile (
  user_id, store_name, store_description, store_country_code, store_region, store_city, store_address
)
SELECT
  id,
  'Hweibo Demo Store',
  'Demo seller catalog and order simulation.',
  'TZ',
  'Dodoma',
  'Dodoma',
  'Dodoma, Tanzania'
FROM "user"
WHERE email = 'seller@hweibo.local'
ON CONFLICT (user_id) DO UPDATE
SET store_name = EXCLUDED.store_name,
    store_description = EXCLUDED.store_description,
    store_country_code = EXCLUDED.store_country_code,
    store_region = EXCLUDED.store_region,
    store_city = EXCLUDED.store_city,
    store_address = EXCLUDED.store_address;

INSERT INTO plan (code, name, price_cents_monthly, currency, is_active)
VALUES
  ('starter', 'Starter', 0, 'USD', TRUE),
  ('pro', 'Pro', 1900, 'USD', TRUE),
  ('business', 'Business', 4900, 'USD', TRUE)
ON CONFLICT (code) DO UPDATE
SET name = EXCLUDED.name,
    price_cents_monthly = EXCLUDED.price_cents_monthly,
    currency = EXCLUDED.currency,
    is_active = EXCLUDED.is_active;

INSERT INTO subscription (seller_id, plan_id, status)
SELECT u.id, p.id, 'active'
FROM "user" u
JOIN plan p ON p.code = 'pro'
WHERE u.email = 'seller@hweibo.local'
ON CONFLICT (seller_id) DO UPDATE
SET plan_id = EXCLUDED.plan_id,
    status = EXCLUDED.status;

DELETE FROM productimage
WHERE product_id IN (
  SELECT id FROM product
  WHERE seller_id = (SELECT id FROM "user" WHERE email = 'seller@hweibo.local')
);

DELETE FROM product
WHERE seller_id = (SELECT id FROM "user" WHERE email = 'seller@hweibo.local');

INSERT INTO product (seller_id, title, description, category, price_cents, currency, is_active)
SELECT seller.id, v.title, v.description, v.category, v.price_cents, 'USD', TRUE
FROM (VALUES
  ('Lenovo IdeaPad', 'A minimalist daily-driver laptop with stable performance.', 'Laptops', 74900),
  ('ASUS Zenbook 14', 'Lightweight laptop for students and everyday work.', 'Laptops', 99900),
  ('MacBook Pro 16-inch', 'Powerful large-screen laptop for creators and engineers.', 'Laptops', 219900),
  ('Dell XPS 17', 'Premium workstation-style laptop with sharp display.', 'Laptops', 189900),
  ('Canon Camera', 'Capture crisp photos and smooth video.', 'Cameras', 89900),
  ('Nike Airmax 90', 'Classic sneaker with reliable comfort.', 'Shoes', 15900),
  ('Puma Sport Runner', 'Supportive running shoe for daily training.', 'Shoes', 12900),
  ('Galaxy Trainers', 'Light trainers for casual and active use.', 'Shoes', 8900)
) AS v(title, description, category, price_cents)
CROSS JOIN (
  SELECT id
  FROM "user"
  WHERE email = 'seller@hweibo.local'
  LIMIT 1
) AS seller;

INSERT INTO productimage (product_id, url, alt_text, sort_order)
SELECT p.id, i.url, p.title, 0
FROM product p
JOIN (
  VALUES
    ('Lenovo IdeaPad', '/product_images/laptops/lenovo-idea-pad.avif'),
    ('ASUS Zenbook 14', '/product_images/laptops/asus-zenbook.jpg'),
    ('MacBook Pro 16-inch', '/product_images/laptops/macbook-pro-16.jpg'),
    ('Dell XPS 17', '/product_images/laptops/xps-17.avif'),
    ('Canon Camera', '/product_images/canon_camera.jpg'),
    ('Nike Airmax 90', '/product_images/shoes/nike-airmax-90.webp'),
    ('Puma Sport Runner', '/product_images/shoes/puma-sport.jpg'),
    ('Galaxy Trainers', '/product_images/shoes/galaxy-5-trainers-with-laces.jpg')
) AS i(title, url)
ON p.title = i.title
WHERE p.seller_id = (SELECT id FROM "user" WHERE email = 'seller@hweibo.local');
