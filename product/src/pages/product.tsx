import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { ProductList } from "../component/ProductList"
import Header from "../component/Header"

export const Product=() =>
{
    return(
        <div>
            <br/>
            <Tabs>
            <TabList>
                <Tab>Product List</Tab>
                {/* <Tab>Dashboard</Tab> */}
            </TabList>
            <TabPanels>
                <TabPanel><ProductList/></TabPanel>
                {/* <TabPanel>Tab 2</TabPanel> */}
            </TabPanels>
            </Tabs>
        </div>
    )
}