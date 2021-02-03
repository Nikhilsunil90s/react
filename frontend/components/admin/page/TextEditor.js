import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('./QuillEditor'), {
  ssr: false
})

export default () => <DynamicComponentWithNoSSR />