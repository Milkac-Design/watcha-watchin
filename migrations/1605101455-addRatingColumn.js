exports.up = async (sql) => {
  await sql`
	ALTER TABLE movies ADD COLUMN rating integer;
		`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE movies DROP COLUMN rating RESTRICT;
	`;
};
