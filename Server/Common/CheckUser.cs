namespace Server.Common
{
    public static class CheckUser
    {
        public static ApiResponse ValidateUser(String? Id)
        {
            int userId;
            try
            {
                userId = int.Parse(Id);
            }
            catch (Exception)
            {
                return new ApiResponse { isSuccess = false, Message = "Invalid user id" };
            }
            return new ApiResponse { isSuccess = true, Message = "Valid User" };
        }
    }
}
