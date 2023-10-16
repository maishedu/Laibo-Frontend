import React from 'react';
import RegisterModal from "../../components/modal/RegisterModal";
import Username from "../../components/auth/set-username";

function Page(props) {
    return (
        <div>
            <RegisterModal open={true}>
            <Username/>
            </RegisterModal>
        </div>
    );
}

export default Page;