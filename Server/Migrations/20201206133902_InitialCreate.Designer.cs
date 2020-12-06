﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Application;

namespace Server.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20201206133902_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Server.Models.Basket", b =>
                {
                    b.Property<int>("BasketId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("basket_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClothesId")
                        .HasColumnName("clothes_id")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnName("user_id")
                        .HasColumnType("int");

                    b.HasKey("BasketId");

                    b.HasIndex("ClothesId");

                    b.HasIndex("UserId");

                    b.ToTable("basket");
                });

            modelBuilder.Entity("Server.Models.Brand", b =>
                {
                    b.Property<int>("BrandId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("brand_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnName("description")
                        .HasColumnType("nvarchar(1024)")
                        .HasMaxLength(1024);

                    b.Property<string>("LogoUrl")
                        .HasColumnName("logo_url")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("BrandId");

                    b.ToTable("brand");
                });

            modelBuilder.Entity("Server.Models.Clothes", b =>
                {
                    b.Property<int>("ClothesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("clothes_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrandId")
                        .HasColumnName("brand_id")
                        .HasColumnType("int");

                    b.Property<string>("Color")
                        .HasColumnName("color")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Description")
                        .HasColumnName("description")
                        .HasColumnType("nvarchar(1024)")
                        .HasMaxLength(1024);

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("PictureUrl")
                        .HasColumnName("picture_url")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<decimal>("Price")
                        .HasColumnName("price")
                        .HasColumnType("decimal(18,4)");

                    b.HasKey("ClothesId");

                    b.HasIndex("BrandId");

                    b.ToTable("clothes");
                });

            modelBuilder.Entity("Server.Models.ClothesCounter", b =>
                {
                    b.Property<int>("ClothesCounterId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("clothes_counter_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClothesId")
                        .HasColumnName("clothes_id")
                        .HasColumnType("int");

                    b.Property<int>("Count")
                        .HasColumnName("count")
                        .HasColumnType("int");

                    b.Property<byte>("Size")
                        .HasColumnName("size")
                        .HasColumnType("tinyint");

                    b.HasKey("ClothesCounterId");

                    b.HasIndex("ClothesId");

                    b.ToTable("clothes_counter");
                });

            modelBuilder.Entity("Server.Models.Comment", b =>
                {
                    b.Property<int>("CommentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("comment_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClothesId")
                        .HasColumnName("clothes_id")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnName("created_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnName("text")
                        .HasColumnType("nvarchar(1024)")
                        .HasMaxLength(1024);

                    b.Property<int>("UserId")
                        .HasColumnName("user_id")
                        .HasColumnType("int");

                    b.HasKey("CommentId");

                    b.HasIndex("ClothesId");

                    b.HasIndex("UserId");

                    b.ToTable("comment");
                });

            modelBuilder.Entity("Server.Models.Favorite", b =>
                {
                    b.Property<int>("FavoriteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("favorite_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClothesId")
                        .HasColumnName("clothes_id")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnName("user_id")
                        .HasColumnType("int");

                    b.HasKey("FavoriteId");

                    b.HasIndex("ClothesId");

                    b.HasIndex("UserId");

                    b.ToTable("favorite");
                });

            modelBuilder.Entity("Server.Models.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("order_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnName("created_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("DeliveryAddress")
                        .HasColumnName("delivery_address")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<byte>("DeliveryType")
                        .HasColumnName("delivery_type")
                        .HasColumnType("tinyint");

                    b.Property<decimal>("Price")
                        .HasColumnName("price")
                        .HasColumnType("decimal(18,4)");

                    b.Property<byte>("Status")
                        .HasColumnName("status")
                        .HasColumnType("tinyint");

                    b.Property<int>("UserId")
                        .HasColumnName("user_id")
                        .HasColumnType("int");

                    b.HasKey("OrderId");

                    b.HasIndex("UserId");

                    b.ToTable("order");
                });

            modelBuilder.Entity("Server.Models.OrderXClothes", b =>
                {
                    b.Property<int>("OrderXClothesId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("order_x_clothes_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClothesId")
                        .HasColumnName("clothes_id")
                        .HasColumnType("int");

                    b.Property<int>("OrderId")
                        .HasColumnName("order_id")
                        .HasColumnType("int");

                    b.HasKey("OrderXClothesId");

                    b.HasIndex("ClothesId");

                    b.HasIndex("OrderId");

                    b.ToTable("order_x_clothes");
                });

            modelBuilder.Entity("Server.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("user_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnName("address")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnName("login")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnName("password")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("PictureUrl")
                        .HasColumnName("picture_url")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Surname")
                        .HasColumnName("surname")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<int>("UserTypeId")
                        .HasColumnName("user_type_id")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.HasIndex("UserTypeId");

                    b.ToTable("user");
                });

            modelBuilder.Entity("Server.Models.UserType", b =>
                {
                    b.Property<int>("UserTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("user_type_id")
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("UserTypeId");

                    b.ToTable("user_type");
                });

            modelBuilder.Entity("Server.Models.Basket", b =>
                {
                    b.HasOne("Server.Models.Clothes", "Clothes")
                        .WithMany()
                        .HasForeignKey("ClothesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Server.Models.Clothes", b =>
                {
                    b.HasOne("Server.Models.Brand", "Brand")
                        .WithMany()
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Server.Models.ClothesCounter", b =>
                {
                    b.HasOne("Server.Models.Clothes", "Clothes")
                        .WithMany()
                        .HasForeignKey("ClothesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Server.Models.Comment", b =>
                {
                    b.HasOne("Server.Models.Clothes", "Clothes")
                        .WithMany()
                        .HasForeignKey("ClothesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Server.Models.Favorite", b =>
                {
                    b.HasOne("Server.Models.Clothes", "Clothes")
                        .WithMany()
                        .HasForeignKey("ClothesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Server.Models.Order", b =>
                {
                    b.HasOne("Server.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Server.Models.OrderXClothes", b =>
                {
                    b.HasOne("Server.Models.Clothes", "Clothes")
                        .WithMany()
                        .HasForeignKey("ClothesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Server.Models.User", b =>
                {
                    b.HasOne("Server.Models.UserType", "UserType")
                        .WithMany()
                        .HasForeignKey("UserTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
