using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Adapter.RepositoriesEF;
using LevelsCompletionTracker.Adapter.Transaction;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Core.Repositories;
using LevelsCompletionTracker.Core.Transaction;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace LevelsCompletionTracker.WebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("CorsPolicy",
    builder =>
    {
        builder.WithOrigins("https://localhost:3173")
               .AllowAnyHeader()
               .AllowAnyMethod();
    }));

            services.AddDbContext<AppDbContext>(options => options.UseSqlite(Configuration.GetConnectionString("AppConnection")));

            services.AddScoped<ILevelRepository, LevelRepository>();
            services.AddScoped<IProgressRepository, ProgressRepository>();
            services.AddScoped<IProgressContainerRepository, ProgressContainerRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<LevelInteractor>();
            services.AddScoped<ProgressInteractor>();


            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Levels Completion Tracker", Version = "v0.1a" })
            );
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}
