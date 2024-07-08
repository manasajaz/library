// type tableprops = {
//   label: string,
//   datasource: any[],
//   cols: any[],
// };
// import BAbutton from "./button";




export default function Table(props) {

  const { datasource, header, label } = props;

  return (
    <>
      <div>
        <h1>{label}</h1>
        <table className="w-[100%] text-center text-white my-5">
          <thead className="bg-gradient-to-r from-cyan-500 to-blue-500">
            <tr>
              {header.map((x, i) => (
                <th key={i}>{x}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gradient-to-r from-indigo-400 to-pink-300">
            {datasource && datasource.length > 0 ? (
              datasource.map((row, i) => (
                <tr key={i}>
                  {header.map((col, i) => (
                    <td key={i}>{row[col]}</td>

                  ))}
                  {/* <div className="flex gap-4 flex-row">
                    <BAbutton
                      label="Delete"
                      onClick={() => Delete()}
                    />
                    <BAbutton
                      label="Update"
                      onClick={() => Update()}
                    />
                  </div> */}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={header.length}>no data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </>
  );
}
