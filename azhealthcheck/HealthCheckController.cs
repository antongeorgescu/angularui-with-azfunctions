using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace azhealthcheck
{
    public static class HealthCheckController
    {
        static readonly string[] errcodes = { "200", "404", "303", "307" };

        [FunctionName("TestFunction")]
        public static async Task<IActionResult> RunTestFunction(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            return name != null
                ? (ActionResult)new OkObjectResult($"Hello, {name}")
                : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
        }

        [FunctionName("RunHealthcheck")]
        public static HealthCheck RunHealthcheck(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            var rnd = new Random();
            var inx = rnd.Next(0, errcodes.Length - 1);

            var hchk = new HealthCheck();
            hchk.Date = DateTime.Now;
            hchk.MainframeStatus = errcodes[inx];

            log.LogInformation($"@{hchk.Date} generated system status:{hchk.MainframeStatus}");
            return hchk;
        }
    }
}
