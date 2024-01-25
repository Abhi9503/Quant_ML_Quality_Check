import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { ProductList } from "../component/ProductList"
import Header from "../component/Header"

export const Product=() =>
{
    return(
        <div className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
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