using System.Web.Configuration;
using System.Data;
using System.Data.SqlClient;
using System;

namespace ChecklistManagement
{
    public class DataAccessComponent : IDisposable
    {
        #region IDISPOSABLE PATTERN
        // Flag: Has Dispose already been called?
        bool disposed = false;
        // Instantiate a SafeHandle instance.
        System.Runtime.InteropServices.SafeHandle handle = new Microsoft.Win32.SafeHandles.SafeFileHandle(IntPtr.Zero, true);

        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                handle.Dispose();
                // Free any other managed objects here.
            }

            disposed = true;
        }
        #endregion

        private static readonly string connectionString = WebConfigurationManager.ConnectionStrings["myDB"].ConnectionString;

        public bool CreateContent(Models.Data data)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "CreateContent";

                        cmd.Parameters.Add(new SqlParameter("@FormId", data.FormId));
                        cmd.Parameters.Add(new SqlParameter("@FunctionalLocation", data.FunctionalLocation));
                        cmd.Parameters.Add(new SqlParameter("@Sequence", data.Sequence));
                        cmd.Parameters.Add(new SqlParameter("@Content", data.Content));
                        cmd.Parameters.Add(new SqlParameter("@Remarks", data.Remarks));

                        cmd.ExecuteNonQuery();
                        conn.Close();

                        return true;
                    }
                }
            }
            catch (Exception exp)
            {
                return true;
            }
        }

        public DataTable RetrieveContent(string id)
        {
            DataTable dtResult = new DataTable();
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "RetrieveContent";

                        cmd.Parameters.Add(new SqlParameter("@id", id + ""));

                        SqlDataAdapter da = new SqlDataAdapter();
                        da.SelectCommand = cmd;
                        da.Fill(dtResult);
                        conn.Close();

                        return dtResult;
                    }
                }
            }
            catch (Exception exp)
            {
                return null;
            }
        }

        public bool UpdateContent(Models.Data data)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "UpdateContent";

                        cmd.Parameters.Add(new SqlParameter("@Id", data.Id));
                        cmd.Parameters.Add(new SqlParameter("@FormId", data.FormId));
                        cmd.Parameters.Add(new SqlParameter("@FunctionalLocation", data.FunctionalLocation));
                        cmd.Parameters.Add(new SqlParameter("@Sequence", data.Sequence));
                        cmd.Parameters.Add(new SqlParameter("@Content", data.Content));
                        cmd.Parameters.Add(new SqlParameter("@Remarks", data.Remarks));

                        cmd.ExecuteNonQuery();
                        conn.Close();

                        return true;
                    }
                }
            }
            catch (Exception exp)
            {
                return false;
            }
        }

        public bool DeleteContent(string id)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "DeleteContent";

                        cmd.Parameters.Add(new SqlParameter("@id", id));
                        cmd.ExecuteNonQuery();
                
                        conn.Close();

                        return true;
                    }
                }
            }
            catch (Exception exp)
            {
                return false;
            }
        }
    }
}