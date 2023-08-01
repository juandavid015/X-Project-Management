import { useState } from "react"

export const useModal = () => {
    const [isActive, setIsActive] = useState(false);
    // open the modal
    const openModal = () => {
        setIsActive(true);
    }
    // close the modal
    const closeModal = () => {
        setIsActive(false);
    }

    return {isActive, openModal, closeModal}
}