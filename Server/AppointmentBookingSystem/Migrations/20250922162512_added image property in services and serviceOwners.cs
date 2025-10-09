using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppointmentBookingSystem.Migrations
{
    /// <inheritdoc />
    public partial class addedimagepropertyinservicesandserviceOwners : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CoverImageUrl",
                table: "Services",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CoverImageUrl",
                table: "ServiceOwners",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "ServiceOwners",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "Rating",
                table: "ServiceOwners",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverImageUrl",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "CoverImageUrl",
                table: "ServiceOwners");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "ServiceOwners");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "ServiceOwners");
        }
    }
}
