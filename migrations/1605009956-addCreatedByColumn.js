exports.up = async (sql) => {
  await sql`
	ALTER TABLE movies ADD COLUMN creator varchar(50);
		`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE movies DROP COLUMN creator RESTRICT;
	`;
};
