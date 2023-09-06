import { DocumentNode, OperationVariables, StoreObject, useMutation } from "@apollo/client";
import { EntityData, getEntityName, getFieldName } from "./useSaveEntity";

export const useDeleteEntity = (documentNode: DocumentNode, queryDocumentNode: DocumentNode) => {
    const [deleteEntity, {loading}] = useMutation(documentNode);
    // Extract entity name from the documentNode
    // const entityName = getEntityName(documentNode)
 // Extract field name to be updated dynamically
    const fieldName = getFieldName(queryDocumentNode)
    const entityName = getEntityName(documentNode)
    const deleteFields = async (id: string | undefined, optimisticData?: EntityData<OperationVariables>) => {
        try {
            return await deleteEntity({
                variables: { id: id },
             
                optimisticResponse: {
                    [entityName]: optimisticData,
                },
                // update(cache) {
                //     cache.modify({
                //         fields: {
                //             [fieldName](existingEntityRefs, { readField }) {
                //                 return existingEntityRefs.filter(
                //                     (entityRef: StoreObject) => id !== readField('id', entityRef)
                //                 )
                //             }
                //         }
                //     })
                // }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {deleteFields, loading}
}