CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE `access` (
  `token` varchar(128) NOT NULL,
  `user_id` int NOT NULL,
  UNIQUE KEY `token_UNIQUE` (`token`),
  KEY `user_idx` (`user_id`),
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `product_price` decimal(10,1) NOT NULL,
  `total_product` int NOT NULL,
  `image` longblob,
  PRIMARY KEY (`id`)
);

CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_order` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `buy` (
  `product_id` int NOT NULL,
  `total` int NOT NULL,
  `order_id` int NOT NULL,
  KEY `product_id_idx` (`product_id`),
  KEY `order_id_idx` (`order_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);
