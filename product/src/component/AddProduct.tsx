import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, chakra, Stack, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import React from "react";
import { useForm } from "react-hook-form"; // Import the useForm hook

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

interface FormFields {
  product_name: string;
  product_group: string;
  company: string;
  status: string;
}

export const AddProduct = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit, formState:{errors} } = useForm<FormFields>(); // Provide the generic type for useForm

  const { createDoc, loading, error } = useFrappeCreateDoc()

  const onSubmit = (data: FormFields) => {
        createDoc("Product Information",data)
        .then(()=>{
            onClose()
         }
        )
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Stack>
                <FormControl>
                    <FormLabel>Product Name</FormLabel>
                    <Input type='text' {...register('product_name', {
                                    required: "Product Name is required",
                    })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Product Group</FormLabel>
                    <Input type='text' {...register('product_group', {
                                    required: "Product Group is required",
                    })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Select defaultValue="Active" {...register('status', { required: "Product Status is required" })}>
                        <option value="Active">Active</option>
                        <option value="In-Active">In-Active</option>
                    </Select>
                 </FormControl>
            </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost'  onClick={onClose}>
            Close
          </Button>
          <Button isLoading={loading} colorScheme='blue' mr={3} type='submit' >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
      </chakra.form>
    </Modal>
  );
};
