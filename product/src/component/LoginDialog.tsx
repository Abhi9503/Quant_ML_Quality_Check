import { useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loginpage from "./Loginpage";
import { useNavigate } from "react-router-dom";

function TransitionExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  
  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleLoginClick = () => {
    onClose();
    navigate('/Loginpage');
  };
  const handleCloseClick = () => {
    onClose();
    navigate('/');
  };
  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={handleCloseClick} 
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Please Login</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You don't have permission. Please log in to access this feature.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCloseClick}>
              Cancel
            </Button>
            <Button colorScheme='green' ml={3} onClick={handleLoginClick}>
              Login
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TransitionExample;
