CREATE TABLE "authors" (
	"id" serial NOT NULL UNIQUE,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"bio" TEXT NOT NULL,
	CONSTRAINT "authors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"id" integer NOT NULL,
	"userName" TEXT NOT NULL,
	"comment" TEXT NOT NULL,
	"articlesId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "articles" (
	"id" serial NOT NULL UNIQUE,
	"authorId" integer NOT NULL,
	"title" TEXT NOT NULL,
	"userName" TEXT NOT NULL,
	CONSTRAINT "articles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("articlesId") REFERENCES "articles"("id");

ALTER TABLE "articles" ADD CONSTRAINT "articles_fk0" FOREIGN KEY ("authorId") REFERENCES "authors"("id");

