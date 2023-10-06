import { ApolloError, DocumentNode, OperationVariables, StoreObject, useMutation } from "@apollo/client";
import { EntityData, getEntityName, getFieldName } from "./useSaveEntity";
import { isCustomErrorResponse } from "../types/typeGuards";
import { handleErrorResponse } from "../helpers/errorHelpers";

export const useDeleteEntity = (documentNode: DocumentNode, queryDocumentNode: DocumentNode) => {
    const [deleteEntity, {loading, error}] = useMutation(documentNode);
    // Extract entity name from the documentNode
    // const entityName = getEntityName(documentNode)
 // Extract field name to be updated dynamically
    const fieldName = getFieldName(queryDocumentNode)
    const entityName = getEntityName(documentNode)
    const deleteFields = async (entityData: EntityData<OperationVariables>, optimisticData?: EntityData<OperationVariables>) => {
        try {
            return await deleteEntity({
                variables: entityData,
             
                optimisticResponse: {
                    [entityName]: optimisticData,
                },
                update(cache) {
                    cache.modify({
                        fields: {
                            [fieldName](existingEntityRefs, { readField }) {
                                return existingEntityRefs.filter(
                                    (entityRef: StoreObject) => entityData.id !== readField('id', entityRef)
                                )
                            }
                        }
                    })
                }
            })
        } catch (error) {
            if(error instanceof ApolloError || isCustomErrorResponse(error)) {
                handleErrorResponse(error)
            }
        }
    }

    return {deleteFields, loading, error}
}