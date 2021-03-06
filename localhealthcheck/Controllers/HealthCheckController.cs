﻿using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

//test
namespace testhealthcheck.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class HealthCheckController : ControllerBase
    {
        private readonly ILogger<HealthCheckController> _logger;

        private readonly string[] errcodes = {"200","404","307"};

        public HealthCheckController(ILogger<HealthCheckController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public HealthCheck Get()
        {
            var rnd = new Random();
            var inx = rnd.Next(0, errcodes.Length - 1);

            var hchk = new HealthCheck();
            hchk.Date = DateTime.Now;
            hchk.MainframeStatus = errcodes[inx];

            _logger.LogInformation($"@{hchk.Date} generated system status:{hchk.MainframeStatus}");
            return hchk;
        }
    }
}
