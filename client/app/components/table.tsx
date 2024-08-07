export default function Table(headings: string[], data: string[]) {
    // headings maps the data properties (keys) to heading names in order
    // data consists of an array of objects

    return (
        <table className="table-auto mt-8 w-full text-left">
            <thead>
                <tr>
                    {
                        headings.map((heading) => {
                            return (
                                <th>{ heading }</th>
                            );
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item) => {
                        return (
                            <p>{ item }</p>
                        )
                    })
                }
            <tr>
            </tr>
            </tbody>
        </table>
    )
}
