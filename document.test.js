const MongoClient = require("mongodb").MongoClient;
const Document = require("./document")

describe("Document Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.xyjdt.mongodb.net/myFirstDatabase",
			{ useNewUrlParser: true },
		);
		Document.injectDB(client);
	})

	afterAll(async () => {
		await Document.delete("test");
		await client.close();
	})

	test("New document registration", async () => {
		const res = await Document.register("test", "FileName");
		expect(res.insertedId).not.toBeUndefined();
	})

	test("Duplicate id", async () => {
		const res = await Document.register("test", "FileName")
		expect(res).toEqual({ "status": "duplicate id" })
	})

});