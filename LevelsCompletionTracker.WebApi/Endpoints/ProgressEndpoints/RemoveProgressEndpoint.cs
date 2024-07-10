using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.ProgressEndpoints
{
    public class RemoveProgressEndpoint : EndpointWithoutRequest<Response>
    {
        private readonly ProgressInteractor progressInteractor;

        public RemoveProgressEndpoint(ProgressInteractor progressInteractor)
        {
            this.progressInteractor = progressInteractor;
        }


        public override void Configure()
        {
            Delete("remove");
            AllowAnonymous();
            Group<ProgressEndpoints>();
        }

        public override async Task HandleAsync(CancellationToken token)
        {
            int progressId = Query<int>("progressId");

            var response = await progressInteractor.RemoveProgressAsync(progressId);
            int code = response.Error ? 400 : 200;

            await SendAsync(response, code, token);
        }
    }
}
