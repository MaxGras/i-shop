import {
    createEntityAdapter, createSlice, createAsyncThunk
} from '@reduxjs/toolkit'


const phoneAdapt = createEntityAdapter({
    selectId: (products) => products.id

});
const initialState = phoneAdapt.getInitialState({
    status: 'idle',
    error: null,
    sortingState: 'default'
});

const phoneSlice = createSlice({
    name: "phones",
    initialState,
    reducers: {
        deleteOne(state,action){

            const idDeleted = action.payload;
            phoneAdapt.removeOne(state,idDeleted);
      
        },
        addOne(state,action){
           const newAdding = action.payload;
     
           phoneAdapt.addOne(state,newAdding); 
        
        },
        editOne(state,action){
            const newEditing = action.payload;
            const idEdit = action.payload.id;
            
            phoneAdapt.updateOne(state,{id:idEdit , changes: newEditing});
        },
        addSortingState(state,action){
            const newSortingState = action.payload;
            state.sortingState = newSortingState;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProductsList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductsList.fulfilled, (state, action) => {
                state.status = "succeeded"

                phoneAdapt.upsertMany(state, action.payload)

            })
            .addCase(getProductsList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })

    }
});

export default phoneSlice.reducer;

export const getProductsList = createAsyncThunk(
   
    'products/fetchProducts',
    async () => {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();
   
        return products;
    }
);

export const {
    selectAll: selectAllPhones,
    selectById: selectPhoneById,
    selectIds: selectPhoneIds

} = phoneAdapt.getSelectors(state => state.phones);
export const {deleteOne,editOne,addOne,addSortingState} = phoneSlice.actions;
