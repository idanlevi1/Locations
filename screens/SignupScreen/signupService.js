export const handleSignupReq = async(newUserData, signupAction) => {
    //TODO: add to DB 
    await signupAction(newUserData);
};