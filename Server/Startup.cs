using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Server.Application;
using Server.Common;
using Server.Common.Auth;
using Server.Common.FileManager;
using Server.Common.MappingProfile;
using Server.DTO;
using Server.Models;
using Server.Repositories;
using Server.Repositories.Impl;
using Server.Services;
using Server.Services.Impl;

namespace Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connection = Configuration.GetConnectionString("Database");
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));
            
            var authSection = Configuration.GetSection("Auth");
            services.Configure<AuthOptions>(authSection);
            var authOptions = authSection.Get<AuthOptions>();
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authOptions.Issuer,

                        ValidateAudience = true,
                        ValidAudience = authOptions.Audience,

                        ValidateLifetime = true,

                        IssuerSigningKey = authOptions.GetSuSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true,
                    };
                });
            
            services.AddControllersWithViews();
            
            services.AddTransient<IClothesService, ClothesService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserTypeService, UserTypeService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IBrandService, BrandService>();
            services.AddTransient<IBasketService, BasketService>();
            services.AddTransient<IFavoriteService, FavoriteService>();
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<IOrderService, OrderService>();
            services.AddTransient<IOrderClothesService, OrderClothesService>();
            services.AddTransient<IFileManager, FileManager>();

            services.AddTransient<IClothesRepository, ClothesRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserTypeRepository, UserTypeRepository>();
            services.AddTransient<IBrandRepository, BrandRepository>();
            services.AddTransient<IBasketRepository, BasketRepository>();
            services.AddTransient<IFavoriteRepository, FavoriteRepository>();
            services.AddTransient<ICommentRepository, CommentRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IOrderClothesRepository, OrderClothesRepository>();
            services.AddTransient<JwtTokenGenerator, JwtTokenGenerator>();
            services.AddTransient<IPasswordHasher<User>, PasswordHasher<User>>();
            
            var mappingConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingProfile()); });
            var mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
