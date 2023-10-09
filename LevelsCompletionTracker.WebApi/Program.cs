using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Adapter.RepositoriesEF;
using LevelsCompletionTracker.Adapter.Transaction;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Core.Repositories;
using LevelsCompletionTracker.Core.Transaction;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace LevelsCompletionTracker.WebApi
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connection = builder.Configuration.GetConnectionString("AppConnection");

            builder.WebHost.UseUrls("http://localhost:5173");

            builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
                policyBuilder =>
                {
                    policyBuilder.WithOrigins("https://localhost:3173")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                }));

            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(connection));

            builder.Services.AddSingleton<Launcher>();

            builder.Services.AddScoped<ILevelRepository, LevelRepository>();
            builder.Services.AddScoped<IProgressRepository, ProgressRepository>();
            builder.Services.AddScoped<IProgressContainerRepository, ProgressContainerRepository>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<LevelInteractor>();
            builder.Services.AddScoped<ProgressInteractor>();


            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Levels Completion Tracker", Version = "v0.1a" })
            );

            var app = builder.Build();

            if (builder.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.OpenBrowserWhenReady();

            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");

            app.MapControllers();

            app.MapPost("/api/shutdown", () =>
            {
                app.StopAsync();
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.Run();
        }
    }
}