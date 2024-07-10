using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.ProgressEndpoints
{
    public class CreateProgressEndpoint : Endpoint<ProgressDto, Response>
    {
        private readonly ProgressInteractor progressInteractor;

        public CreateProgressEndpoint(ProgressInteractor progressInteractor)
        {
            this.progressInteractor = progressInteractor;
        }

        public override void Configure()
        {
            Post("create");
            AllowAnonymous();
            Group<ProgressEndpoints>();
        }

        public override async Task HandleAsync(ProgressDto request, CancellationToken token)
        {
            int levelId = Query<int>("levelId");

            var response = await progressInteractor.CreateProgressAsync(request, levelId);

            if (!response.Error)
            {
                await SendAsync(response, 200, token);
            }
            else
            {
                await SendAsync(response, 400, token);
            }
        }
    }
}
