using System ;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChecklistManagement.Controllers
{
    public class FormController : Controller
    {
        // GET: Form
        public ActionResult Index(string testId)
        {
            if (!string.IsNullOrEmpty(testId))
            {
                string filePath = Server.MapPath(@"~/Forms/result_" + testId + ".html");

                if (System.IO.File.Exists(filePath))
                {
                    string fileContent = System.IO.File.ReadAllText(filePath);

                    ViewBag.FormContent = fileContent;
                    ViewBag.FormTitle = testId;
                }
                return View("FormView");
            }
            else
            {
                return View();
            }
        }

        public ActionResult SaveResult(string formId, string data)
        {
            ViewBag.formId = formId;
            ViewBag.data = data;
            ViewBag.status = "";

            Models.Data currentData = new Models.Data()
            {
                Id = Guid.NewGuid().ToString(),
                FormId = formId,
                Content = data,
                FunctionalLocation = "FunctionalLocation",
                Remarks = "Remarks",
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now
            };

            ViewBag.status = "Object instantiated";

            ChecklistManagement.DataHelper dataHelper = new DataHelper();
            if (dataHelper.Create(currentData))
            {
                ViewBag.status = "Object created";
            }

            return View();
        }

        public ActionResult Test(string activity, string dataid)
        {
            if (activity != null)
            {
                Models.Data testData = new Models.Data()
                {
                    Id = Guid.NewGuid().ToString(),
                    FormId = Guid.NewGuid().ToString(),
                    Content = "test content",
                    FunctionalLocation = "test functional location",
                    Remarks = "rest remarks",
                    Version = 1,
                    Sequence = 1,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                };

                DataHelper helper = new DataHelper();

                activity = activity.ToLower();
                ViewBag.Action = activity;

                switch (activity)
                {
                    case "create":
                        ViewBag.ActionResult = helper.Create(testData);
                        return View();
                    case "update":
                        ViewBag.ActionResult = helper.Update(testData);
                        return View();
                    case "delete":
                        ViewBag.ActionResult = helper.Delete(dataid);
                        return View();
                    case "retrieve":
                        List<Models.Data> resultList = helper.Retrieve(dataid);
                        return View(resultList);
                    default:
                        return View();
                }
            }

            return View();
        }

    }
}