import { RefObject, useEffect } from "react"

interface Props {
    elementRef: RefObject<HTMLElement>
    onClickOutside?: ()=> void | undefined
}

export const useClickOutside = ({elementRef, onClickOutside}: Props) => {
    useEffect(() => {
        
        const closeOnOutside = (e: MouseEvent) => {
         if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
             onClickOutside && onClickOutside();
 
         } return
        };
 
        document.addEventListener('click', closeOnOutside, true);
 
        return () => {
         document.removeEventListener('click', closeOnOutside, true)

        }
 
     },[])
}