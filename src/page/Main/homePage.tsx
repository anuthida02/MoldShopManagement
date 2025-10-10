import { ColourfulText } from '../../components/ui/colorful-text';
import { AuroraBackground } from '../../components/ui/aurora-background';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, Tag } from 'antd';


function homePage() {

  const data = [
    {
      name: 'MONDAY',
      uv: 4000,
      work: 2400,
      amt: 2400
    },
    {
      name: 'TUESDAY',
      uv: 3000,
      work: 1398,
      amt: 2210
    },
    {
      name: 'WEDNESDAY',
      uv: 2780,
      work: 3908,
      amt: 2000
    },
    {
      name: 'THURSDAY',
      uv: 1890,
      work: 4800,
      amt: 2181,
    },
    {
      name: 'FIRDAY',
      uv: 2390,
      work: 3800,
      amt: 2500,
    }
  ]

  const column = [
    {
      title: <div className='text-black dark:text-white text-sm font-bold'>MOLD / DIE ID</div>,
      dataIndex: 'mdid',
      key: 'mdid',
      align: 'center'
    },
    {
      title: <div className='text-black dark:text-white text-sm font-bold'>MOLD / DIE NAME</div>,
      dataIndex: 'mdname',
      key: 'mdname',
      align: 'center'
    },
    {
      title: <div className='text-black dark:text-white text-sm font-bold'>LAST MAINTENANCE DATE</div>,
      dataIndex: 'lmtdate',
      key: 'lmtdate',
      align: 'center'
    },
    {
      title: <div className='text-black dark:text-white text-sm font-bold'>NEXT MAINTENANCE DATE</div>,
      dataIndex: 'nmtdate',
      key: 'nmtdate',
      align: 'center'
    },
    {
      title: <div className='text-black dark:text-white text-sm font-bold'>DAYS REMAINING</div>,
      dataIndex: 'dremain',
      key: 'dremain',
      align: 'center'
    },
    {
      title: <div className="text-black dark:text-white text-sm font-bold">STATUS</div>,
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (text: string) => {
        if (text === "NEARDUE") {
          return <Tag color="orange">NEARDUE</Tag>;
        } else if (text === "OVERDUE") {
          return <Tag color="red">OVERDUE</Tag>;
        } else {
          return <Tag color="green">ON TRACK</Tag>;
        }
      }
    }

  ]


  const dataupcmt = [
    { mdid: '00001', mdname: 'ABC', lmtdate: '20250310', nmtdate: '20251029', dremain: '', status: 'NEARDUE' },
    { mdid: '00002', mdname: 'XXX', lmtdate: '20250212', nmtdate: '20250918', dremain: '', status: 'OVERDUE' },
    { mdid: '00003', mdname: 'XXX', lmtdate: '20250512', nmtdate: '20251118', dremain: '', status: 'ON TRACK' }
  ]

  return (
    <AuroraBackground>

      <div className="h-full w-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 overflow-auto">

        <div className='font-bold text-2xl mx-5'>
          <ColourfulText text='Mold / Die' />
          <br />
          <ColourfulText text='Maintenance' />
        </div>

        <div className='grid grid-cols-2 gap-3 p-4 my-4 h-[400px]'>
          <div className='container  bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-900 shadow-lg rounded-xl p-2'>
            <p className='text-black font-semibold dark:text-white text-center'>Jobs per day Mon-Fri</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 25
                }}
                barSize={30}
              >
                <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 20 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* เส้นประ */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Bar
                  dataKey="work"
                  fill='#ffa600'
                  background={{ fill: "#eee", radius: 50 }}
                  radius={[50, 50, 50, 50]}
                  label={{ position: 'top' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='container bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-900 shadow-lg rounded-xl'>
            <Table
              dataSource={dataupcmt}
              columns={column}
              bordered
              className='m-3 rounded-2xl'
            />
          </div>
          <div className='container bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-900 shadow-lg rounded-xl p-2 h-[400px]'>
            <p className='text-black font-semibold dark:text-white text-center'>Jobs per day Mon-Fri</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 25
                }}
                barSize={30}
              >
                <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 20 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* เส้นประ */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Bar
                  dataKey="work"
                  fill='#ffa600'
                  background={{ fill: "#eee", radius: 50 }}
                  radius={[50, 50, 50, 50]}
                  label={{ position: 'top' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AuroraBackground>

  )
}

export default homePage