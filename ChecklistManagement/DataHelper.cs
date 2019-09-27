using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChecklistManagement
{
    public class DataHelper
    {

        public bool Create(Models.Data data)
        {
            if (data != null)
            {
                //Save data to DB
                return true;
            } 
            else
            {
                return false;
            }
        }
        public bool Update(Models.Data data)
        {
            if (data != null)
            {
                //Update data to DB
                return true;
            }
            else
            {
                return false;
            }
        }
        public List<Models.Data> Retrieve(string dataId = "")
        {
            if (!string.IsNullOrEmpty(dataId))
            {
                //Return data from DB
                return new List<Models.Data>();
            }
            else
            {
                return null;
            }
        }
        public bool Delete(string dataId)
        {
            if (!string.IsNullOrEmpty(dataId))
            {
                //Delete from DB
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}