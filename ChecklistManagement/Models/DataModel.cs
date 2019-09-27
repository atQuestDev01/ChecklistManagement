using System;

namespace ChecklistManagement.Models
{
    public class Data
    {
        public string Id { get; set; }
        public string FormId { get; set; }
        public string FunctionalLocation { get; set; }
        public int Version { get; set; }
        public int Sequence { get; set; }
        public string Content { get; set; }
        public string Remarks { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }

    public class ArchivedData
    {
        public string ArchivedId { get; set; }
        public DateTime ArchivedDate { get; set; }
        public string ArchivedAction { get; set; }
        public string Id { get; set; }
        public string FormId { get; set; }
        public string FunctionalLocation { get; set; }
        public int Version { get; set; }
        public int Sequence { get; set; }
        public string Content { get; set; }
        public string Remarks { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}