/**
 * homeDashboard.ts
 * version 1.0.0
 * 
 * Created on the 09/05/2023
 */

import { STYLES } from '../utils/frontend'
import DashboardMainContainer from '../components/main/dashboardMainContainer'
import { Helmet } from 'react-helmet'
import CONSTANTS from '../utils/main/constants'
import SideCard from '../components/card/sideCard'
import { Spacer } from '../components/main'

const { APP_NAME } = CONSTANTS


export function HomeDashboard() {
    return (
        <div className='flex w-full relative overflow-hidden' style={STYLES.noScrollOuterDiv}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{APP_NAME}</title>
            </Helmet>

            <DashboardMainContainer centerHorizontally maxWidth={"1100px"}>
                {/* <h1 className='my-5 font-bold text-2xl text-red-600' onClick={() => {
                    api.test()
                }}>Youtube</h1>
                <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/iF2la6FxVQc?si=k336W9kSe3ayG1SK" // "https://www.youtube.com/embed/y5vLMARfcgQ?si=pO1fPg9N2c3qJvrc" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
                */}
                <Spacer paddingSize='outer'/>
                {/*
                <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/kW29kRu1e_I?si=dY3JnS_-jsAuxQ4F" 
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                  */}
                <Spacer paddingSize='outer'/>
                <Spacer paddingSize='outer'/>
                <SideCard />
            </DashboardMainContainer>
        </div>
    )
}