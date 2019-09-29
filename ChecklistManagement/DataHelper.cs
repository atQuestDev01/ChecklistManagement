using System;
using System.Collections.Generic;
using System.Data;
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
                using (DataAccessComponent dac = new DataAccessComponent())
                { 
                    return dac.CreateContent(data);
                }
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
                using (DataAccessComponent dac = new DataAccessComponent())
                {
                    return dac.UpdateContent(data);
                }
            }
            else
            {
                return false;
            }
        }
        public List<Models.Data> Retrieve(string dataId = "")
        {
            //Return data from DB
            using (DataAccessComponent dac = new DataAccessComponent())
            {
                DataTable dtResult = dac.RetrieveContent(dataId);

                return DataTableToList<Models.Data>(dtResult);
            }
        }
        public bool Delete(string dataId)
        {
            if (!string.IsNullOrEmpty(dataId))
            {
                //Delete from DB
                using (DataAccessComponent dac = new DataAccessComponent())
                {
                    return dac.DeleteContent(dataId);
                }
            }
            else
            {
                return false;
            }
        }


        private List<T> DataTableToList<T>(DataTable dtValue) where T : class, new()
        {
            try
            {
                List<T> returnList = new List<T>();

                foreach (var currentRow in dtValue.AsEnumerable())
                {
                    T obj = new T();

                    foreach (var prop in obj.GetType().GetProperties())
                    {
                        try
                        {
                            System.Reflection.PropertyInfo propertyInfo = obj.GetType().GetProperty(prop.Name);
                            propertyInfo.SetValue(obj, Convert.ChangeType(currentRow[prop.Name], propertyInfo.PropertyType), null);
                        }
                        catch
                        {
                            continue;
                        }
                    }

                    returnList.Add(obj);
                }

                return returnList;
            }
            catch
            {
                return null;
            }
        }
    }
}