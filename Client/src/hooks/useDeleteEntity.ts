import { DocumentNode, StoreObject, useMutation } from "@apollo/client";
import { getFieldName } from "./useSaveEntity";

export const useDeleteEntity = (documentNode: DocumentNode, queryDocumentNode: DocumentNode) => {
    const [deleteEntity] = useMutation(documentNode);
    // Extract entity name from the documentNode
    // const entityName = getEntityName(documentNode)
 // Extract field name to be updated dynamically
    const fieldName = getFieldName(queryDocumentNode)

    const deleteFields = async (id: string | undefined) => {
        try {
            await deleteEntity({
                variables: {id: id},
                update(cache) {
                    cache.modify({
                        fields: {
                            [fieldName](existingEntityRefs, { readField }) {
                                return existingEntityRefs.filter(
                                    (entityRef: StoreObject) => id !== readField('id', entityRef)
                                )
                            }
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return deleteFields
}