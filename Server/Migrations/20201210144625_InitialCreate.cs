using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "brand",
                columns: table => new
                {
                    brand_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    description = table.Column<string>(maxLength: 1024, nullable: true),
                    logo_url = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_brand", x => x.brand_id);
                });

            migrationBuilder.CreateTable(
                name: "user_type",
                columns: table => new
                {
                    user_type_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_type", x => x.user_type_id);
                });

            migrationBuilder.CreateTable(
                name: "clothes",
                columns: table => new
                {
                    clothes_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    brand_id = table.Column<int>(nullable: false),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    price = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    gender_type = table.Column<byte>(type: "tinyint", nullable: false),
                    picture_url = table.Column<string>(maxLength: 255, nullable: true),
                    description = table.Column<string>(maxLength: 1024, nullable: true),
                    color = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_clothes", x => x.clothes_id);
                    table.ForeignKey(
                        name: "FK_clothes_brand_brand_id",
                        column: x => x.brand_id,
                        principalTable: "brand",
                        principalColumn: "brand_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    user_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_type_id = table.Column<int>(nullable: false),
                    login = table.Column<string>(maxLength: 255, nullable: false),
                    password = table.Column<string>(maxLength: 255, nullable: false),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    surname = table.Column<string>(maxLength: 255, nullable: true),
                    address = table.Column<string>(maxLength: 255, nullable: true),
                    picture_url = table.Column<string>(maxLength: 255, nullable: true),
                    gender_type = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.user_id);
                    table.ForeignKey(
                        name: "FK_user_user_type_user_type_id",
                        column: x => x.user_type_id,
                        principalTable: "user_type",
                        principalColumn: "user_type_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "clothes_counter",
                columns: table => new
                {
                    clothes_counter_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    clothes_id = table.Column<int>(nullable: false),
                    size = table.Column<byte>(type: "tinyint", nullable: false),
                    count = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_clothes_counter", x => x.clothes_counter_id);
                    table.ForeignKey(
                        name: "FK_clothes_counter_clothes_clothes_id",
                        column: x => x.clothes_id,
                        principalTable: "clothes",
                        principalColumn: "clothes_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "basket",
                columns: table => new
                {
                    basket_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(nullable: false),
                    clothes_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_basket", x => x.basket_id);
                    table.ForeignKey(
                        name: "FK_basket_clothes_clothes_id",
                        column: x => x.clothes_id,
                        principalTable: "clothes",
                        principalColumn: "clothes_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_basket_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "comment",
                columns: table => new
                {
                    comment_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(nullable: false),
                    clothes_id = table.Column<int>(nullable: false),
                    text = table.Column<string>(maxLength: 1024, nullable: false),
                    created_date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comment", x => x.comment_id);
                    table.ForeignKey(
                        name: "FK_comment_clothes_clothes_id",
                        column: x => x.clothes_id,
                        principalTable: "clothes",
                        principalColumn: "clothes_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_comment_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "favorite",
                columns: table => new
                {
                    favorite_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(nullable: false),
                    clothes_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_favorite", x => x.favorite_id);
                    table.ForeignKey(
                        name: "FK_favorite_clothes_clothes_id",
                        column: x => x.clothes_id,
                        principalTable: "clothes",
                        principalColumn: "clothes_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_favorite_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "order",
                columns: table => new
                {
                    order_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(nullable: false),
                    price = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    status = table.Column<byte>(type: "tinyint", nullable: false),
                    delivery_address = table.Column<string>(maxLength: 255, nullable: true),
                    created_date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_order", x => x.order_id);
                    table.ForeignKey(
                        name: "FK_order_user_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "order_x_clothes",
                columns: table => new
                {
                    order_x_clothes_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_id = table.Column<int>(nullable: false),
                    clothes_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_order_x_clothes", x => x.order_x_clothes_id);
                    table.ForeignKey(
                        name: "FK_order_x_clothes_clothes_clothes_id",
                        column: x => x.clothes_id,
                        principalTable: "clothes",
                        principalColumn: "clothes_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_order_x_clothes_order_order_id",
                        column: x => x.order_id,
                        principalTable: "order",
                        principalColumn: "order_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_basket_clothes_id",
                table: "basket",
                column: "clothes_id");

            migrationBuilder.CreateIndex(
                name: "IX_basket_user_id",
                table: "basket",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_clothes_brand_id",
                table: "clothes",
                column: "brand_id");

            migrationBuilder.CreateIndex(
                name: "IX_clothes_counter_clothes_id",
                table: "clothes_counter",
                column: "clothes_id");

            migrationBuilder.CreateIndex(
                name: "IX_comment_clothes_id",
                table: "comment",
                column: "clothes_id");

            migrationBuilder.CreateIndex(
                name: "IX_comment_user_id",
                table: "comment",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_favorite_clothes_id",
                table: "favorite",
                column: "clothes_id");

            migrationBuilder.CreateIndex(
                name: "IX_favorite_user_id",
                table: "favorite",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_order_user_id",
                table: "order",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_order_x_clothes_clothes_id",
                table: "order_x_clothes",
                column: "clothes_id");

            migrationBuilder.CreateIndex(
                name: "IX_order_x_clothes_order_id",
                table: "order_x_clothes",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_user_type_id",
                table: "user",
                column: "user_type_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "basket");

            migrationBuilder.DropTable(
                name: "clothes_counter");

            migrationBuilder.DropTable(
                name: "comment");

            migrationBuilder.DropTable(
                name: "favorite");

            migrationBuilder.DropTable(
                name: "order_x_clothes");

            migrationBuilder.DropTable(
                name: "clothes");

            migrationBuilder.DropTable(
                name: "order");

            migrationBuilder.DropTable(
                name: "brand");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "user_type");
        }
    }
}
