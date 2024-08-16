import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "stripeCustomerId", "status", "password") VALUES ('7ca98525-3d49-4e33-9bfe-762db1c0896c', '1Darrick_Keebler37@gmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=3', 'invitationToken3', 'cus_31415', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "stripeCustomerId", "status", "password") VALUES ('328ef58a-85fe-45cb-990e-fe6be1df7adf', '9Edward0@hotmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=11', 'invitationToken1', 'cus_16171', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "stripeCustomerId", "status", "password") VALUES ('e086b3a4-6e86-4641-a9bd-f55e979961df', '17Devon56@hotmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=19', 'invitationToken5', 'cus_31415', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "stripeCustomerId", "status", "password") VALUES ('10bcd90a-c283-43ee-a8c2-7d36d526bdab', '33Lenore_Smith90@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=35', 'invitationToken3', 'cus_16171', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "stripeCustomerId", "status", "password") VALUES ('c606b2e2-990c-4dad-ae7c-3622b12ff887', '41Cielo.Boyle@yahoo.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=43', 'invitationToken4', 'cus_11121', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "stripeCustomerId", "status", "password") VALUES ('02b78903-f6fd-4ebc-8636-4fc20a9b7472', '49Josianne.Mohr47@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=51', 'invitationToken1', 'cus_11121', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "stripeCustomerId", "status", "password") VALUES ('059d3d3b-b10b-492e-9e8d-4ca411757884', '57Chandler_Herzog@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=59', 'invitationToken1', 'cus_11121', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "stripeCustomerId", "status", "password") VALUES ('03575b43-05ee-4633-bff9-28a30c00cf36', '65Adele.Tromp@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=67', 'invitationToken1', 'cus_31415', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "stripeCustomerId", "status", "password") VALUES ('b8829ed3-2971-411b-94f7-9e3d1f3612fd', '73Hershel61@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=75', 'invitationToken3', 'cus_67890', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('807abcf6-6937-470a-ba91-3051b7255207', 'The only limit to our realization of tomorrow is our doubts of today.', 'William James', 'Motivation', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('42c7e9d5-2757-4286-8ed5-5405ae8d1a4b', 'The best way to predict the future is to create it.', 'Theodore Roosevelt', 'Success', '7ca98525-3d49-4e33-9bfe-762db1c0896c');
INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('f1c0d5af-1a21-4fab-9fff-e3849fd8c4ad', 'Believe you can and youre halfway there.', 'Theodore Roosevelt', 'Future', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('cc96f3de-6c75-4cdd-b06d-a42ebce921db', 'Believe you can and youre halfway there.', 'Peter Drucker', 'Future', 'e086b3a4-6e86-4641-a9bd-f55e979961df');
INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('c32f00b7-9062-40fb-947d-a56409aab118', 'Believe you can and youre halfway there.', 'Winston Churchill', 'Motivation', 'e086b3a4-6e86-4641-a9bd-f55e979961df');
INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('9a6c7dda-7e7d-4802-a251-4aeed6433744', 'Act as if what you do makes a difference. It does.', 'Franklin D. Roosevelt', 'Impact', '7ca98525-3d49-4e33-9bfe-762db1c0896c');
INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('14dfc87e-d0ef-4137-8822-33aba27336fa', 'Act as if what you do makes a difference. It does.', 'Theodore Roosevelt', 'Success', '059d3d3b-b10b-492e-9e8d-4ca411757884');
INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('fbdf85fe-204a-4e3f-b0bd-fe22d9407ea6', 'Success is not final failure is not fatal It is the courage to continue that counts.', 'Theodore Roosevelt', 'Success', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('6c74f9a0-4919-42f5-aa1f-b4aff9c93713', 'The best way to predict the future is to create it.', 'Winston Churchill', 'Impact', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Quote" ("id", "text", "author", "category", "userId") VALUES ('2c2afd3c-dd6a-4671-8018-1a9561fdabbe', 'Act as if what you do makes a difference. It does.', 'Peter Drucker', 'Belief', '10bcd90a-c283-43ee-a8c2-7d36d526bdab');

INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('76ceacf6-e066-4f2e-ba7b-d675ec8e2df8', 'https://i.imgur.com/YfJQV5z.png?id=121', 'A majestic waterfall in a tropical paradise.', 'Nature', 'b8829ed3-2971-411b-94f7-9e3d1f3612fd');
INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('5c6ca61c-66a9-4a0d-b20c-1f87fb1fe20c', 'https://i.imgur.com/YfJQV5z.png?id=125', 'A serene beach with crystal clear water.', 'Travel', '328ef58a-85fe-45cb-990e-fe6be1df7adf');
INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('98878480-5854-4859-914a-74924eb8fcec', 'https://i.imgur.com/YfJQV5z.png?id=129', 'A majestic waterfall in a tropical paradise.', 'Nature', 'b8829ed3-2971-411b-94f7-9e3d1f3612fd');
INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('6024f72b-e593-42b8-806c-413226667649', 'https://i.imgur.com/YfJQV5z.png?id=133', 'A beautiful sunrise over the mountains.', 'Travel', '03575b43-05ee-4633-bff9-28a30c00cf36');
INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('5907fc07-4a3d-4b1d-b7f6-584c3057b6ef', 'https://i.imgur.com/YfJQV5z.png?id=137', 'A tranquil forest path in autumn.', 'Inspiration', '03575b43-05ee-4633-bff9-28a30c00cf36');
INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('569aba36-83d5-470f-9091-05400240c497', 'https://i.imgur.com/YfJQV5z.png?id=141', 'A tranquil forest path in autumn.', 'Nature', 'b8829ed3-2971-411b-94f7-9e3d1f3612fd');
INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('b1e3adbd-d262-4574-92f1-a146fe3f02fb', 'https://i.imgur.com/YfJQV5z.png?id=145', 'A majestic waterfall in a tropical paradise.', 'Travel', '7ca98525-3d49-4e33-9bfe-762db1c0896c');
INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('d0b75c98-789d-4ad8-b3eb-c1b1ae001482', 'https://i.imgur.com/YfJQV5z.png?id=149', 'A bustling cityscape at night.', 'Inspiration', 'c606b2e2-990c-4dad-ae7c-3622b12ff887');
INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('69e5f35e-b04f-4029-a0a8-218b8cec8bd9', 'https://i.imgur.com/YfJQV5z.png?id=153', 'A bustling cityscape at night.', 'Urban', 'b8829ed3-2971-411b-94f7-9e3d1f3612fd');
INSERT INTO "Image" ("id", "url", "description", "category", "userId") VALUES ('4ca4d5c1-2afe-401d-9b8e-6a7c823926ca', 'https://i.imgur.com/YfJQV5z.png?id=157', 'A tranquil forest path in autumn.', 'Nature', '10bcd90a-c283-43ee-a8c2-7d36d526bdab');

INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('97e802ea-3ff5-4630-b29b-3c7dd2003966', 'https://i.imgur.com/YfJQV5z.png?id=161', 'A short clip on the power of positive thinking.', 'Success', '328ef58a-85fe-45cb-990e-fe6be1df7adf');
INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('34afd887-073e-4087-9137-975ad1ec0726', 'https://i.imgur.com/YfJQV5z.png?id=165', 'A video that encourages you to never give up.', 'Inspiration', '02b78903-f6fd-4ebc-8636-4fc20a9b7472');
INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('7e1017fd-508d-495f-86bb-e69492afcec4', 'https://i.imgur.com/YfJQV5z.png?id=169', 'A motivational video on achieving your dreams.', 'Motivation', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('a86157b8-50a6-44ce-9d96-584d5f8c7dbd', 'https://i.imgur.com/YfJQV5z.png?id=173', 'A short clip on the power of positive thinking.', 'Success', '059d3d3b-b10b-492e-9e8d-4ca411757884');
INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('1cbecf8c-884d-4cc1-9d6a-2844708ff0d4', 'https://i.imgur.com/YfJQV5z.png?id=177', 'A short clip on the power of positive thinking.', 'Inspiration', '059d3d3b-b10b-492e-9e8d-4ca411757884');
INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('200bed98-69ab-443f-bcc0-4f25bfc56c06', 'https://i.imgur.com/YfJQV5z.png?id=181', 'A motivational video on achieving your dreams.', 'Motivation', 'b8829ed3-2971-411b-94f7-9e3d1f3612fd');
INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('e83a9a7e-8ac1-420d-8b08-4fe239d7c816', 'https://i.imgur.com/YfJQV5z.png?id=185', 'An uplifting video about overcoming obstacles.', 'Inspiration', '03575b43-05ee-4633-bff9-28a30c00cf36');
INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('46737bb1-70a8-4380-9a8a-375fcf73ae02', 'https://i.imgur.com/YfJQV5z.png?id=189', 'A video that encourages you to never give up.', 'Inspiration', '059d3d3b-b10b-492e-9e8d-4ca411757884');
INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('1a9bdf30-006a-4a9f-afe0-17e832144f90', 'https://i.imgur.com/YfJQV5z.png?id=193', 'An uplifting video about overcoming obstacles.', 'Inspiration', '03575b43-05ee-4633-bff9-28a30c00cf36');
INSERT INTO "Video" ("id", "url", "description", "category", "userId") VALUES ('9fd1aa15-d77e-4d34-8f2f-f9698307a6f7', 'https://i.imgur.com/YfJQV5z.png?id=197', 'An inspiring video about perseverance.', 'Inspiration', 'b8829ed3-2971-411b-94f7-9e3d1f3612fd');

INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('81a78d4b-7894-4e37-a822-7463f46a334a', 'Such an inspiring message thank you for sharing.', '7b2fe507-4de2-4a4d-90e4-d3d482bbc60c', 'image', 'c606b2e2-990c-4dad-ae7c-3622b12ff887');
INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('76c46f38-5818-425b-9d4c-caa014c71c98', 'Great video it really motivated me to keep going.', '20addb43-2a29-4e6f-aca5-f14bacb865d0', 'image', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('145d9100-1529-4a8a-89c4-be9f9bb5b067', 'I needed to hear this today amazing', '2aff165c-21dc-46da-97bd-91edb7d8284c', 'image', '10bcd90a-c283-43ee-a8c2-7d36d526bdab');
INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('7f62a039-88b8-4f76-8eee-d88612a792b5', 'Great video it really motivated me to keep going.', '177a351c-100d-48a7-a2ad-4b2033afd724', 'quote', '10bcd90a-c283-43ee-a8c2-7d36d526bdab');
INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('5330ace0-85b0-456f-ad4e-aabf2193ce6c', 'Such an inspiring message thank you for sharing.', 'a146e387-32cd-46ba-a232-a7497f1933a4', 'video', 'c606b2e2-990c-4dad-ae7c-3622b12ff887');
INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('ba6b4d62-0684-46fc-9477-35c3c1bce3d7', 'This quote really resonates with me', '3f0ff728-19fb-4acd-bad9-ac676a2c6e24', 'image', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('8c627ec9-e828-4379-a186-6039792edacd', 'Such an inspiring message thank you for sharing.', '430e43d3-04f3-4390-a528-7484a59fd51f', 'quote', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('2b3bb1d6-899a-47fe-9306-3dd1240e0e64', 'This quote really resonates with me', '7f37e9ca-cf2c-4419-92f1-be5fcd0572a7', 'image', '328ef58a-85fe-45cb-990e-fe6be1df7adf');
INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('222d66de-f287-4359-b8fc-bebb42e4516f', 'This quote really resonates with me', '455fcb9e-47a8-44f2-8448-894179fa5f47', 'video', '328ef58a-85fe-45cb-990e-fe6be1df7adf');
INSERT INTO "Comment" ("id", "text", "contentId", "contentType", "userId") VALUES ('bd1db341-c17b-4a5c-a362-b29d32ae66fd', 'Great video it really motivated me to keep going.', '66aef14b-cde2-4b41-9bdf-9474ea7b4729', 'image', '03575b43-05ee-4633-bff9-28a30c00cf36');

INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('c40eba19-632d-4432-81f5-24d174b9a552', '5e1047de-5544-424e-a8c9-292d77d79399', 'recommendation', '059d3d3b-b10b-492e-9e8d-4ca411757884');
INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('11dc8753-7a70-4493-bf59-98ef8f94aac6', 'ccf1efe2-f4b5-43e2-bb7d-cc6cfa4eca25', 'recommendation', '7ca98525-3d49-4e33-9bfe-762db1c0896c');
INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('1b538333-3285-4525-aa3a-44d539d50823', '47bf7316-62a8-4302-a32b-391307f0ba31', 'image', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('a990cf08-022c-4c6b-8d23-c9075fca91f7', '271f6e1a-71c2-4eca-92eb-228e4ef446a3', 'video', '03575b43-05ee-4633-bff9-28a30c00cf36');
INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('3727df5a-f1d0-41b7-a876-4a3617b20c16', '4785c759-dc3e-49e8-b776-ed698dbfaeea', 'quote', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('6c2f6754-eaf5-4605-98db-5dbc14f5f5b9', '08fbe63b-916a-458a-a704-2f71e15aa91f', 'post', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('1119243a-4305-461e-a51c-e04f9ef70706', '80533590-e0b3-48a9-a6cf-b312f95cbff7', 'image', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('de4be0c4-8c18-4f2b-9840-7171ac88b413', '754fc644-5b8a-4206-9cc0-a9eb55acaa31', 'recommendation', '10bcd90a-c283-43ee-a8c2-7d36d526bdab');
INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('18fddaf4-8831-4202-985f-7c7a46231d3d', '2a77a2ed-2a86-4470-9cde-fc2662ce94ba', 'image', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Like" ("id", "contentId", "contentType", "userId") VALUES ('d6892fa6-6da6-4eef-9af6-24f9641d1f40', '4dc7c59d-66bf-46ee-afab-1a4024dd5f53', 'video', '03575b43-05ee-4633-bff9-28a30c00cf36');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
