using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

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
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            var strval = await client.GetStringAsync("https://financialmodelingprep.com/api/v3/majors-indexes/.DJI");
            return strval;
        }

        // GET <controller>/bitcoin/all/async
        [HttpGet("bitcoin/all/async")]
        public async Task<IEnumerable<BitcoinRecord>> GetAsyncBitcoinAll()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            var strval = await client.GetStringAsync("https://blockchain.info/ticker");
            var jxval = JObject.Parse(strval);

            var lstres = new List<BitcoinRecord>();
            foreach (var item in jxval.Children())
            {
                lstres.Add(new BitcoinRecord()
                {
                    Currency = item.Path.ToString(),
                    Sell = double.Parse(item.First()["sell"].ToString()),
                    Buy = double.Parse(item.First()["buy"].ToString()),
                    Symbol = item.First()["symbol"].ToString()
                });
            }
            return lstres.ToArray<BitcoinRecord>();

        }

        // GET <controller>/bitcoin/all
        [HttpGet("bitcoin/all")]
        public IEnumerable<BitcoinRecord> GetBitcoinAll()
        {
            // use this call to transform an asynchronus call to a synchronous one:
            // (async) var result = GetAsyncBitcoinAll()
            // (sync) var result = GetAsyncBitcoinAll().Result;
            var result = GetAsyncBitcoinAll().Result;
            return result;

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

    public class BitcoinRecord
    {
        //"USD" : {"15m" : 7112.92, "last" : 7112.92, "buy" : 7112.92, "sell" : 7112.92, "symbol" : "$"},
        public double Buy { get; set; }
        public string Currency { get; set; }
        public double Sell { get; set; }
        public string Symbol { get; set; }
    }
}
