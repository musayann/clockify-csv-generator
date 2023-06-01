import type { NextPage } from 'next'
import { Converter } from '../components/converter'
const AworkConvert: NextPage = () => {
    return <Converter apiPath="/api/awork" title="awork to Clockify" />
}

export default AworkConvert
