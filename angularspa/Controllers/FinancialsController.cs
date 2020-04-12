using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace bitcoin_xrates.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FinancialsController : Controller
    {
        private readonly ILogger<FinancialsController> _logger;
        private static readonly HttpClient client = new HttpClient();

        public FinancialsController(ILogger<FinancialsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<string> Get()
        {
        
            //var rng = new Random();
            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    Date = DateTime.Now.AddDays(index),
            //    TemperatureC = rng.Next(-20, 55),
            //    Summary = Summaries[rng.Next(Summaries.Length)]
            //})
            //.ToArray();

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            var strval = await client.GetStringAsync("https://financialmodelingprep.com/api/v3/majors-indexes/.DJI");
            return strval;
        }

        // GET <controller>/bitcoin/all
        [HttpGet("bitcoin/all")]
        public async Task<string> GetBitcoinAll()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            var strval = await client.GetStringAsync("https://blockchain.info/ticker");
            return strval;
        }

        // GET <controller>/bitcoin/USD/500
        [HttpGet("bitcoin/{currency}/{amount}")]
        public async Task<double> GetBitcoinCurrencyAmount(string currency, int amount)
        {
            //https://blockchain.info/tobtc?currency=USD&value=500
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            var strval = await client.GetStringAsync($"https://blockchain.info/tobtc?currency={currency}&value={amount}");
            return Double.Parse(strval);
        }
    }
}
