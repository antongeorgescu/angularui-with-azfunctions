using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using YahooFinance.NET;

namespace testui.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class CountryInfoController : ControllerBase
    {
        
        private readonly ILogger<CountryInfoController> _logger;

        public CountryInfoController(ILogger<CountryInfoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public CountryInfo Get(string countryName)
        {
            string url = @"https://restcountries.eu/rest/v2/name/" + $"{countryName}";
            HttpWebRequest request = WebRequest.CreateHttp(url);
            request.Method = "GET"; // or "POST", "PUT", "PATCH", "DELETE", etc.

            CountryInfo result = null;
            try
            {

                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    // Do something with the response
                    using (Stream responseStream = response.GetResponseStream())
                    {
                        // Get a reader capable of reading the response stream
                        using (StreamReader myStreamReader = new StreamReader(responseStream, Encoding.UTF8))
                        {
                            // Read stream content as string
                            string responseJSON = myStreamReader.ReadToEnd();

                            // Assuming the response is in JSON format, deserialize it
                            // creating an instance of TData type (generic type declared before).
                            var oresult = JsonConvert.DeserializeObject<object>(responseJSON);

                            result = new CountryInfo
                            {
                                Name = ((dynamic)JsonConvert.DeserializeObject(responseJSON))[0].name,
                                Capital = ((dynamic)JsonConvert.DeserializeObject(responseJSON))[0].capital,
                                Population = ((dynamic)JsonConvert.DeserializeObject(responseJSON))[0].population,
                                Area = ((dynamic)JsonConvert.DeserializeObject(responseJSON))[0].area
                            };

                        }
                    }
                }
            }
            catch(Exception ex)
            {
                result = new CountryInfo
                {
                    Name = ex.Message,
                    Capital = "not applicable",
                    Population = "0",
                    Area = "0"
                };
            }
            return result;
        }
    }

    public class CountryInfo
    {
        public string Name { get; set; }

        public string Capital { get; set; }

        public string Population { get; set; }

        public string Area { get; set; }
    }
}
