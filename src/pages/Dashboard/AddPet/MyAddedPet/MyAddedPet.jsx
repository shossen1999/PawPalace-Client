import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table'
import { useContext, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../../Provider/AuthProvider';

const MyAddedPet = () => {
    const [sorting, setSorting] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    // Fetch pets
    const { refetch, data: pets = [] } = useQuery({
        queryKey: ['pets', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/pets/${user.email}`);
            return res.data;
        }
    });

    // DELETE PET
    const handleDelete = (petId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosPublic.delete(`/pet/${petId}`);
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your pet has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                } catch (err) {
                    toast.error(err.message);
                }
            }
        });
    };

    // MARK ADOPTED
    const handleAdopted = async (petId) => {
        try {
            const { data } = await axiosPublic.put(`/pet/adopted/${petId}`);
            if (data.modifiedCount > 0) {
                toast.success("Pet marked as adopted");
                refetch();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const data = useMemo(() => pets, [pets]);

    /** @type import('@tanstack/react-table').columnDef<any>[] */
    const columns = [
        {
            header: "#",
            cell: (cell) => cell.row.index + 1
        },
        {
            accessorKey: 'pet_image',
            header: 'Pet Image',
            cell: (cell) => <img className='h-12 w-12 rounded-full' src={cell.getValue()} />
        },
        {
            accessorKey: 'pet_name',
            header: 'Pet Name'
        },
        {
            accessorKey: 'pet_age',
            header: 'Pet Age'
        },
        {
            accessorKey: 'pet_category',
            header: 'Pet Category'
        },
        {
            accessorKey: 'adopted',
            header: 'Adopted',
            cell: info => (info.getValue() ? 'Adopted' : 'Not Adopted')
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex items-center gap-4'>
                    <Link to={`/dashboard/updatePet/${row.original._id}`}>
                        <button>
                            <MdEditSquare className='text-2xl' />
                        </button>
                    </Link>

                    <button 
                        onClick={() => handleDelete(row.original._id)} 
                        className="text-red-600 hover:text-red-900"
                    >
                        <MdDelete className='text-2xl' />
                    </button>

                    {!row.original.adopted ? (
                        <button
                            onClick={() => handleAdopted(row.original._id)}
                            className='bg-[#F07C3D] text-white px-2 py-1 font-medium rounded-md'
                        >
                            Not Adopted
                        </button>
                    ) : (
                        <button
                            disabled
                            className='bg-gray-300 text-white px-2 py-1 font-medium rounded-md'
                        >
                            Adopted
                        </button>
                    )}
                </div>
            )
        }
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
        onSortingChange: setSorting,
    });

    return (
        <div>
            <h2 className='text-4xl font-semibold text-center mb-12'>My Added Pet</h2>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className='bg-[#F07C3D] text-white'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                >
                                    {header.isPlaceholder ? null : (
                                        <div className='flex items-center'>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: <FaAngleUp className='text-2xl' />,
                                                desc: <FaAngleDown className='text-2xl' />
                                            }[header.column.getIsSorted() ?? null]}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {pets.length > 10 && (
                <div className='flex gap-4 mt-8 items-center justify-center'>
                    <button onClick={() => table.setPageIndex(0)} className="btn">First page</button>
                    <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className="btn">Prev page</button>
                    <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className="btn">Next page</button>
                    <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="btn">Last page</button>
                </div>
            )}
        </div>
    );
};

export default MyAddedPet;
