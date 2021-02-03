import { ResponsiveLine } from '@nivo/line'

export const SparkLine = ({ data, color, curve }) => (

    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        xFormat=" >-"
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        curve={curve}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={null}
        enableGridY={false}
        colors={color}
        pointSize={10}
        pointColor={color}
        pointBorderWidth={2}
        pointBorderColor={color}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[]}
        motionConfig={{ mass: 1, tension: 170, friction: 26, clamp: false, precision: 0.01, velocity: 0 }}
        theme={{
            grid: {
                line: {
                  stroke: '#1e88f7',
                  strokeWidth: .5
                }
            },
            fontSize: '12px',
            textColor: '#969697',

        }}
    />
)