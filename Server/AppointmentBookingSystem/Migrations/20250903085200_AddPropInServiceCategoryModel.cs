using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppointmentBookingSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddPropInServiceCategoryModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ServiceCategories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IconKey",
                table: "ServiceCategories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "Description", "IconKey", "Name" },
                values: new object[] { "Hair, nails, skincare & beauty treatments", "salon", "Salon & Beauty" });

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 2,
                columns: new[] { "Description", "IconKey", "Name" },
                values: new object[] { "Healthcare appointments & consultations", "medical", "Medical Services" });

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 3,
                columns: new[] { "Description", "IconKey", "Name" },
                values: new object[] { "Professional consultancy services", "consultant", "Consulting Services" });

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 4,
                columns: new[] { "Description", "IconKey" },
                values: new object[] { "Personal training & wellness coaching", "fitness" });

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 5,
                columns: new[] { "Description", "IconKey", "Name" },
                values: new object[] { "Independent professionals for various tasks", "services", "Freelancer Services" });

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 6,
                columns: new[] { "Description", "IconKey" },
                values: new object[] { "Cleaning, repairs & maintenance", "home" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "ServiceCategories");

            migrationBuilder.DropColumn(
                name: "IconKey",
                table: "ServiceCategories");

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 1,
                column: "Name",
                value: "Salon");

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 2,
                column: "Name",
                value: "Clinic");

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 3,
                column: "Name",
                value: "Consultant");

            migrationBuilder.UpdateData(
                table: "ServiceCategories",
                keyColumn: "ID",
                keyValue: 5,
                column: "Name",
                value: "Freelancer");
        }
    }
}
