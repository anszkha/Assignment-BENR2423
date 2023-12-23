const MongoClient = require("mongodb").MongoClient;
const Project = require("./project")


describe("Project Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.xyjdt.mongodb.net/myFirstDatabase",
			{ useNewUrlParser: true },
		);
		Project.injectDB(client);
	})
	
	afterAll(async () => {
		await Project.delete("test");
		await client.close();

	})
	
	test("New project registration", async () => {
		const res = await Project.register("test", "ProjectName", "Husna");
		expect(res.insertedId).not.toBeUndefined();

	})
	

	test("Duplicate id", async () => {
		const res = await Project.register("test", "ProjectName", "Husna")
		expect(res).toEqual({ "status": "duplicate id" })
		
	})

});
