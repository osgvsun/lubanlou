INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`,
                                   `api_name`, `white_label`, `description`, `part_white_label`)
VALUES ('attendance', '/attendance/**', 'attendance', NULL, 0, 1, 1, NULL, 1, NULL, NULL);
