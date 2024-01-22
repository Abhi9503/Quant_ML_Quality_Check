import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, HStack, Heading, Spinner, Stack, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useFrappeDocTypeEventListener, useFrappeGetDocList } from "frappe-react-sdk"
import Header from "./Header"
import { AddProduct } from "./AddProduct"
import { Link } from "react-router-dom"

interface ProductList{
    name:string,
    product_name:string,
    product_group:string,
    status:string, 
    image:String
}

export const ProductList=()=>
{
    const {data, isLoading,error,mutate}= useFrappeGetDocList<ProductList>('Product Information',{fields:["name","product_name","product_group","status","image"]})
    const {isOpen,onOpen,onClose}= useDisclosure()  
    useFrappeDocTypeEventListener('Product Information', async (d) => {
        if (d.doctype === "Product Information") {
          try {
            await mutate();
          } catch (error) {
            console.error("Error while mutating:", error);
          }
        }
      }); 

    return(
        <Stack> 
            <HStack justify={'space-between'}>
                <Heading as="h1" fontSize={"xl"}>Products</Heading>
                <Box>
                    <Button colorScheme="blue" onClick={onOpen}>Add</Button>
                </Box>
            </HStack>
            {isLoading && <Center h='40vh'><Spinner/></Center>}
            {error && <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{error.exception}</AlertTitle>
                <AlertDescription>{error.httpStatusText}</AlertDescription>
                </Alert>}
            {data && <Table>
                    <Thead>
                        <Tr>
                            <Th>Product Id</Th>
                            <Th>Product Name</Th>
                            <Th>Product Group</Th>
                            <Th>Status</Th>
                            <Th>File</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                            {data.map((d: ProductList) => <Tr key={d.name}>
                                <Td>
                                    {d.name}
                                </Td>
                                <Td>
                                    {d.product_name}
                                </Td>
                                <Td>
                                    {d.product_group}
                                </Td>
                                <Td>
                                    {d.status}
                                </Td>
                                <Td>
                                    {d.image && (
                                        <Link isExternal href={d.image}>
                                        Download
                                        </Link>
                                    )}
                                </Td>
                            </Tr>)}
                    </Tbody>
                </Table>}
                <AddProduct isOpen={isOpen} onClose={onClose}/>
        </Stack>
    )
}