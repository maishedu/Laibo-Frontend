'use client'
import {AiOutlineClose} from 'react-icons/ai';

function RegisterModal({open,onclose,children}) {
    return (
        <div className={`fixed inset-0 
        flex justify-center 
        items-center 
        transition-colors 
        ${open ? "visible bg-black" : "invisible"}`}>
            <div onClick={(e)=>e.stopPropagation()}
            className={`bg-black rounded-xl shadow p-6 transition-all
            ${open ? "scale-100 opacity-100": "scale-125 opacity-0"}
            `}
            >{children}
            </div>
        </div>
    );
}

export default RegisterModal;