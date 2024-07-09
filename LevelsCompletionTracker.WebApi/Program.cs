using FastEndpoints;
using FastEndpoints.Swagger;
using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Adapter.RepositoriesEF;
using LevelsCompletionTracker.Adapter.Transaction;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Core.Repositories;
using LevelsCompletionTracker.Core.Transaction;
using Microsoft.EntityFrameworkCore;

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
            builder.Services.AddScoped<ICircleRunRepository, CircleRunRepository>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<LevelInteractor>();
            builder.Services.AddScoped<ProgressInteractor>();
            builder.Services.AddScoped<CircleRunInteractor>();

            builder.Services.SwaggerDocument(o =>
            {
                o.DocumentSettings = s =>
                {
                    s.DocumentName = "lcpt";
                    s.Title = "LCPT Api";
                    s.Version = "v0.1a";
                };
            });

            builder.Services
                .AddFastEndpoints()
                .AddSwaggerDocument();


            builder.Services.AddEndpointsApiExplorer();

            var app = builder.Build();

            app
                .UseFastEndpoints(c =>
                {
                    c.Endpoints.RoutePrefix = "api";
                })
                .UseSwaggerGen();

            app.OpenBrowserWhenReady();

            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");

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